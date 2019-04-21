import React from "react";
import PropTypes from 'prop-types';
import "./react-bootstrap-treeview.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";

export class TreeView extends React.Component {

    constructor(props){
        super(props);
        this.setNodeId({nodes: this.props.data});
    }


    setNodeId(node) {

        if (!node.nodes) return;

        let _this = this;
        node.nodes.forEach(function checkStates(node) {
            node.nodeId = _this.props.nodes.length;
            _this.props.nodes.push(node);
            _this.setNodeId(node);
        });
    }

    render() {

        let _this = this;
        let children = [];

        this.props.data.forEach(function (node,index) {
            children.push(<TreeNode node={node} options={_this.props} level={1} key={'lev0_'+index.toString()} />);
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

TreeView.propTypes = {
    levels: PropTypes.number,

    expandIcon: PropTypes.string,
    collapseIcon: PropTypes.string,
    emptyIcon: PropTypes.string,
    nodeIcon: PropTypes.string,

    color: PropTypes.string,
    backColor: PropTypes.string,
    borderColor: PropTypes.string,
    onhoverColor: PropTypes.string,
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

    expandIcon: 'fa fa-expand',
    collapseIcon: 'fa fa-collapse',
    emptyIcon: 'glyphicon',
    nodeIcon: 'glyphicon glyphicon-stop',

    color: undefined,
    backColor: undefined,
    borderColor: undefined,
    onhoverColor: '#F5F5F5', // TODO Not implemented yet, investigate radium.js 'A toolchain for React component styling'
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
            selected: false,
        };
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
    }


    toggleExpanded(id, event) {
        this.setState({expanded: !this.state.expanded});
        event.stopPropagation();
    }

    toggleSelected(id, event) {
        this.setState({selected: !this.state.selected});
        event.stopPropagation();
    }

    render() {

        const {node, options, level } = this.props;
        const {expanded, selected} = this.state;

        let style;
        if (options.highlightSelected && selected) {
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

        let expandCollapseIcon;
        if (node.nodes) {
            if (!expanded) {
                expandCollapseIcon = (

                    <span className={options.expandIcon}
                          onClick={this.toggleExpanded.bind(this, node.nodeId)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                );
            } else {
                expandCollapseIcon = (
                    <span className={options.collapseIcon}
                          onClick={this.toggleExpanded.bind(this, node.nodeId)}>
                        <FontAwesomeIcon icon={faMinus} />
                    </span>
                );
            }
        } else {
            expandCollapseIcon = (
                <span className={options.emptyIcon}/>
            );
        }

        let nodeIcon = (
            <span className='icon'>
        <i className={node.icon || options.nodeIcon}/>
      </span>
        );

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
        result.push(
            <li className='list-group-item'
                style={style}
                onClick={this.toggleSelected.bind(this, node.nodeId)}
                key={node.nodeId}>
                {indents}
                {expandCollapseIcon}
                {nodeIcon}
                {nodeText}
                {badges}
            </li>
        );
        if (expanded) {
            node.nodes.forEach(function (node,index) {
                result.push(<TreeNode node={node} options={options} level={level+1} key={'lev'+level.toString() + '_'+ index.toString()}/>);
            });
        }

        return result;
    }
}