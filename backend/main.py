from typing import Any, Dict, List, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str
    type: Optional[str] = None
    data: Optional[Dict[str, Any]] = None

    model_config = ConfigDict(extra="ignore")  # Pydantic v2


class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str

    model_config = ConfigDict(extra="ignore")  # Pydantic v2


class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

    model_config = ConfigDict(extra="ignore")  # Pydantic v2


def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    node_ids = {n.id for n in nodes}
    adj = {n.id: [] for n in nodes}
    indeg = {n.id: 0 for n in nodes}

    for e in edges:
        if not e.source or not e.target:
            continue
        if e.source not in node_ids or e.target not in node_ids:
            continue

        adj[e.source].append(e.target)
        indeg[e.target] += 1

    queue = [nid for nid in node_ids if indeg[nid] == 0]
    visited = 0

    while queue:
        nid = queue.pop()
        visited += 1

        for nxt in adj[nid]:
            indeg[nxt] -= 1
            if indeg[nxt] == 0:
                queue.append(nxt)

    return visited == len(node_ids)


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag(pipeline.nodes, pipeline.edges),
    }
