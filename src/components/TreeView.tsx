import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import "./TreeView.css";

interface Node {
    text: string;
    id: number;
    nodes: Node[];
}

interface TreeNodeProps {
    node: Node;
    level: number;
    selectedNodeID?: number;
    toggleSelectedNodeID: (id: number) => void;
}

interface TreeViewProps {
    data: Node[];
}

export class TreeView extends React.Component<TreeViewProps, { selectedNodeID: number }> {

    constructor(props: TreeViewProps) {
        super(props);
        this.state = {selectedNodeID: -1};
        this.toggleSelectedNodeID = this.toggleSelectedNodeID.bind(this);
    }

    toggleSelectedNodeID(id: number) {
        if (this.state.selectedNodeID === id) {
            this.setState({selectedNodeID: -1});
            return;
        }
        this.setState({selectedNodeID: id});
    }

    render() {
        let {selectedNodeID} = this.state;
        let children: React.ReactNode[] = [];
        let toggleSelectedNodeID = this.toggleSelectedNodeID;

        this.props.data.forEach(function (node, index) {
            children.push(
                <TreeNode
                    node={node}
                    level={1}
                    key={'lev0_' + index.toString()}
                    selectedNodeID={selectedNodeID}
                    toggleSelectedNodeID={toggleSelectedNodeID}
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
        if (p.selectedNodeID !== p.node.id){
            p.toggleSelectedNodeID(p.node.id);
        }
        event.stopPropagation();
    }

    toggleSelected(event: any) {
        this.props.toggleSelectedNodeID(this.props.node.id);
        event.stopPropagation();
    }

    render() {

        const {node, level, selectedNodeID, toggleSelectedNodeID} = this.props;
        const {expanded} = this.state;

        let style: any = {color: '#428bca'};
        if (node.id === selectedNodeID) {
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
            node.nodes.length === 0
                ? <span style={{margin: "0px 10px 0px 24px"}}/>
                : <span onClick={this.toggleExpanded} style={{margin: "0px 10px"}}>
                    <FontAwesomeIcon icon={expanded ? faMinus : faPlus }/>
                </span>;

        let nodeText = <span>{node.text}</span>;

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
        if (expanded) {
            node.nodes.forEach(function (node, index) {
                result.push(
                    <TreeNode
                        node={node}
                        level={level + 1}
                        key={'lev' + level.toString() + '_' + index.toString()}
                        toggleSelectedNodeID={toggleSelectedNodeID}
                        selectedNodeID={selectedNodeID}
                    />);
            });
        }

        return result;
    }
}


