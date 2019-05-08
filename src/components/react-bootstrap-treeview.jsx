import React from "react";
import PropTypes from 'prop-types';
import "./react-bootstrap-treeview.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export class TreeView extends React.Component {

    constructor(props){
        super(props);
        let nodes = [];
        initializeNodes(nodes, {nodes: this.props.data});
        this.state = {selectedNodeID:-1};

        this.toggleSelectedNodeID = this.toggleSelectedNodeID.bind(this);
    }

    toggleSelectedNodeID(id) {
        if (this.state.selectedNodeID === id){
            this.setState({selectedNodeID: -1});
            return;
        }
        this.setState({selectedNodeID: id});
    }

    render() {
        let _this = this;
        let children = [];
        this.props.data.forEach(function (node,index) {
            children.push(
                <TreeNode
                    node={node}
                    options={_this.props}
                    level={1}
                    key={'lev0_'+index.toString()}
                    selectedNodeID={_this.state.selectedNodeID}
                    toggleSelectedNodeID={_this.toggleSelectedNodeID}
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

function initializeNodes(nodes, node) {

    if (!node.nodes) return;

    node.nodes.forEach(function(node) {
        node.nodeId = nodes.length;
        nodes.push(node);
        initializeNodes(nodes, node);
    });
}

TreeView.propTypes = {
    levels: PropTypes.number,

    color: PropTypes.string,
    backColor: PropTypes.string,
    borderColor: PropTypes.string,
    selectedColor: PropTypes.string,
    selectedBackColor: PropTypes.string,

    enableLinks: PropTypes.bool,
    highlightSelected: PropTypes.bool,
    showBorder: PropTypes.bool,
    showTags: PropTypes.bool,

    nodes: PropTypes.arrayOf(PropTypes.number),
};


TreeView.defaultProps = {
    levels: 2,
    color: undefined,
    backColor: undefined,
    borderColor: undefined,
    selectedColor: '#FFFFFF',
    selectedBackColor: '#428bca',

    enableLinks: false,
    highlightSelected: true,
    showBorder: true,
    showTags: false,

    nodes: []
};

class TreeNode extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            expanded: false,
        };
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
    }


    toggleExpanded(id, event) {
        this.setState({expanded: !this.state.expanded});
        event.stopPropagation();
    }

    toggleSelected(id, event) {
        this.props.toggleSelectedNodeID(id);
        event.stopPropagation();
    }

    render() {

        const {node, options, level, selectedNodeID, toggleSelectedNodeID } = this.props;
        const {expanded} = this.state;


        let style = {};
        if (options.highlightSelected && (node.nodeId === selectedNodeID) ) {
            style = {
                color: options.selectedColor,
                backgroundColor: options.selectedBackColor
            };
        } else {
            style = {
                color: node.color || options.color,
                backgroundColor: node.backColor || options.backColor
            };
        }

        if (!options.showBorder) {
            style.border = 'none';
        } else if (options.borderColor) {
            style.border = '1px solid ' + options.borderColor;
        }

        let indents = [];
        for (let i = 0; i < level - 1; i++) {
            indents.push(<span className='indent' key={i} />);
        }

        let expandCollapseIcon = null;
        if (node.nodes) {
            if (!expanded) {
                expandCollapseIcon =
                    <span onClick={this.toggleExpanded.bind(this, node.nodeId)} style={{margin:"0px 10px"}} >
                        <FontAwesomeIcon icon={faPlus} />
                    </span>;

            } else {
                expandCollapseIcon =
                    <span onClick={this.toggleExpanded.bind(this, node.nodeId)} style={{margin:"0px 10px"}} >
                        <FontAwesomeIcon icon={faMinus} />
                    </span>;
            }
        } else {
            expandCollapseIcon =
                <span style={{margin:"0px 10px 0px 24px"}} >

                </span>;
        }

        let nodeText;
        if (options.enableLinks) {
            nodeText = (
                <a href={node.href} /*style="color:inherit;"*/>
                    {node.text}
                </a>
            );
        } else {
            nodeText = (
                <span>{node.text}</span>
            );
        }

        let badges;
        if (options.showTags && node.tags) {
            badges = node.tags.map(function (tag) {
                return (
                    <span className='badge'>{tag}</span>
                );
            });
        }
        let result = [];

        style.padding = "2px 3px";

        result.push(
            <li className='list-group-item'
                style={style}
                onClick={this.toggleSelected.bind(this, node.nodeId)}
                key={node.nodeId}>
                {indents}
                {expandCollapseIcon}
                {nodeText}
                {badges}
            </li>
        );
        if (expanded) {
            node.nodes.forEach(function (node,index) {
                result.push(
                    <TreeNode
                        node={node}
                        options={options}
                        level={level+1}
                        key={'lev'+level.toString() + '_'+ index.toString()}
                        toggleSelectedNodeID={toggleSelectedNodeID}
                        selectedNodeID={selectedNodeID}
                    />);
            });
        }

        return result;
    }
}