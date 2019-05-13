import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import "./TreeView.css";

interface Node {
    name: string;
    id: number;
    nodes?: Node[];
}

interface TreeNodeProps {
    node: Node;
    level: number;
    selectedNode?: Node;
    toggleSelectedNode: (node: Node) => void;
}

interface TreeViewProps {
    data: Node[];
    onChangeSelectedNode: (node?:Node) => void;

}

export class TreeView extends React.Component<TreeViewProps, { selectedNode?: Node }> {

    constructor(props: TreeViewProps) {
        super(props);
        this.toggleSelectedNode = this.toggleSelectedNode.bind(this);
        this.state = {selectedNode: undefined};
        if (this.props.onChangeSelectedNode  ){
            this.props.onChangeSelectedNode(undefined);
        }

    }

    toggleSelectedNode(node: Node) {
        if (this.state.selectedNode === node) {
            this.setSelectedNode(undefined);
            return;
        }
        this.setSelectedNode(node);
    }

    setSelectedNode(node?: Node){
        if (this.props.onChangeSelectedNode && node !== this.state.selectedNode ){
            this.props.onChangeSelectedNode(node);
        }
        this.setState({selectedNode: node});
    }

    render() {
        let {selectedNode} = this.state;
        let children: React.ReactNode[] = [];
        let toggleSelectedNode = this.toggleSelectedNode;

        this.props.data.forEach(function (node, index) {
            children.push(
                <TreeNode
                    node={node}
                    level={1}
                    key={'lev0_' + index.toString()}
                    selectedNode={selectedNode}
                    toggleSelectedNode={toggleSelectedNode}
                />);
        });

        return (
            <div id='treeview' className='treeview'>
                <ul className='list-group'>
                    {children}
                </ul>
            </div>
        );
    }
}

class TreeNode extends React.Component<TreeNodeProps, { expanded: boolean }> {

    constructor(props: TreeNodeProps) {
        super(props);
        this.state = {
            expanded: false,
        };
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
    }


    toggleExpanded(event: any) {
        this.setState({expanded: !this.state.expanded});
        const p = this.props;
        if (p.selectedNode !== p.node){
            p.toggleSelectedNode(p.node);
        }
        event.stopPropagation();
    }

    toggleSelected(event: any) {
        this.props.toggleSelectedNode(this.props.node);
        event.stopPropagation();
    }

    render() {

        const {node, level, selectedNode, toggleSelectedNode} = this.props;
        const {expanded} = this.state;

        let style: any = {color: '#428bca'};
        if (node === selectedNode) {
            style = {
                color: '#FFFFFF',
                backgroundColor: '#428bca'
            };
        }

        style.padding = "2px 3px";

        let indents = [];
        for (let i = 0; i < level - 1; i++) {
            indents.push(<span className='indent' key={i}/>);
        }

        let expandCollapseIcon =
            !node.nodes
                ? <span style={{margin: "0px 10px 0px 24px"}}/>
                : <span onClick={this.toggleExpanded} style={{margin: "0px 10px"}}>
                    <FontAwesomeIcon icon={expanded ? faMinus : faPlus }/>
                </span>;

        let nodeText = <span>{node.name}</span>;

        let result = [];

        result.push(
            <li className='list-group-item'
                style={style}
                onClick={this.toggleSelected}
                key={node.id}>
                {indents}
                {expandCollapseIcon}
                {nodeText}

            </li>
        );
        if (node.nodes && expanded) {
            node.nodes.forEach(function (node, index) {
                result.push(
                    <TreeNode
                        node={node}
                        level={level + 1}
                        key={'lev' + level.toString() + '_' + index.toString()}
                        toggleSelectedNode={toggleSelectedNode}
                        selectedNode={selectedNode}
                    />);
            });
        }

        return result;
    }
}


