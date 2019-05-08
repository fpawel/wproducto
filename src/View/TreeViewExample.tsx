import React from "react";
import {TreeView} from "../components/TreeView";

export default function TreeViewExample() {


    function initializeNodes(nodes: Node[], node: Node) {

        if (!node.nodes) return;

        node.nodes.forEach(function(node) {
            node.id = nodes.length;
            nodes.push(node);
            initializeNodes(nodes, node);
        });
    }

    let data  : Node[] = [
        {
            id: 0,
            text: 'Parent 1',
            nodes: [
                {
                    text: 'Child 1', id: 0,
                    nodes: [
                        {
                            text: 'Grandchild 1', id: 0, nodes : [],
                        },
                        {
                            text: 'Grandchild 2', id: 0, nodes : [],
                        }
                    ]
                },
                {
                    text: 'Child 2', id: 0, nodes : [],
                }
            ]
        },
        {
            text: 'Parent 2', id: 0, nodes : [],
        },
        {
            text: 'Parent 3', id: 0, nodes : [],
        },
        {
            text: 'Parent 4', id: 0, nodes : [],
        },
        {
            text: 'Parent 5', id: 0, nodes : [],
        },

        {
            id: 0,
            text: 'Parent 1',
            nodes: [
                {
                    text: 'Child 1', id: 0,
                    nodes: [
                        {
                            text: 'Grandchild 1', id: 0, nodes : [],
                        },
                        {
                            text: 'Grandchild 2', id: 0, nodes : [],
                        }
                    ]
                },
                {
                    text: 'Child 2', id: 0, nodes : [],
                }
            ]
        },
        {
            text: 'Parent 2', id: 0, nodes : [],
        },
        {
            text: 'Parent 3', id: 0, nodes : [],
        },
        {
            text: 'Parent 4', id: 0, nodes : [],
        },
        {
            text: 'Parent 5', id: 0, nodes : [],
        },

        {
            id: 0,
            text: 'Parent 1',
            nodes: [
                {
                    text: 'Child 1', id: 0,
                    nodes: [
                        {
                            text: 'Grandchild 1', id: 0, nodes : [],
                        },
                        {
                            text: 'Grandchild 2', id: 0, nodes : [],
                        }
                    ]
                },
                {
                    text: 'Child 2', id: 0, nodes : [],
                }
            ]
        },
        {
            text: 'Parent 2', id: 0, nodes : [],
        },
        {
            text: 'Parent 3', id: 0, nodes : [],
        },
        {
            text: 'Parent 4', id: 0, nodes : [],
        },
        {
            text: 'Parent 5', id: 0, nodes : [],
        },

        {
            id: 0,
            text: 'Parent 1',
            nodes: [
                {
                    text: 'Child 1', id: 0,
                    nodes: [
                        {
                            text: 'Grandchild 1', id: 0, nodes : [],
                        },
                        {
                            text: 'Grandchild 2', id: 0, nodes : [],
                        }
                    ]
                },
                {
                    text: 'Child 2', id: 0, nodes : [],
                }
            ]
        },
        {
            text: 'Parent 2', id: 0, nodes : [],
        },
        {
            text: 'Parent 3', id: 0, nodes : [],
        },
        {
            text: 'Parent 4', id: 0, nodes : [],
        },
        {
            text: 'Parent 5', id: 0, nodes : [],
        },

        {
            id: 0,
            text: 'Parent 1',
            nodes: [
                {
                    text: 'Child 1', id: 0,
                    nodes: [
                        {
                            text: 'Grandchild 1', id: 0, nodes : [],
                        },
                        {
                            text: 'Grandchild 2', id: 0, nodes : [],
                        }
                    ]
                },
                {
                    text: 'Child 2', id: 0, nodes : [],
                }
            ]
        },
        {
            text: 'Parent 2', id: 0, nodes : [],
        },
        {
            text: 'Parent 3', id: 0, nodes : [],
        },
        {
            text: 'Parent 4', id: 0, nodes : [],
        },
        {
            text: 'Parent 5', id: 0, nodes : [],
        },

        {
            id: 0,
            text: 'Parent 1',
            nodes: [
                {
                    text: 'Child 1', id: 0,
                    nodes: [
                        {
                            text: 'Grandchild 1', id: 0, nodes : [],
                        },
                        {
                            text: 'Grandchild 2', id: 0, nodes : [],
                        }
                    ]
                },
                {
                    text: 'Child 2', id: 0, nodes : [],
                }
            ]
        },
        {
            text: 'Parent 2', id: 0, nodes : [],
        },
        {
            text: 'Parent 3', id: 0, nodes : [],
        },
        {
            text: 'Parent 4', id: 0, nodes : [],
        },
        {
            text: 'Parent 5', id: 0, nodes : [],
        },

    ];
    initializeNodes([], {nodes: data, id:0, text:""});
    return <TreeView data={data} />;
}



interface Node {
    text:string;
    id:number;
    nodes: Node[];
}
