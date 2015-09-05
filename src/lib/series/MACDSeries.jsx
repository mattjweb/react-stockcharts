"use strict";

import React from "react";
import d3 from "d3";

import HistogramSeries from "./HistogramSeries";
import Line from "./Line";
import StraightLine from "./StraightLine";

class MACDSeries extends React.Component {
	constructor(props) {
		super(props);
		this.getHorizontalLine = this.getHorizontalLine.bind(this);
	}
	getChildContext() {
		var yAccess = this.context.yAccessor;
		return {
			yAccessor: (d) => yAccess(d) && yAccess(d).histogram,
		};
	}
	getHorizontalLine() {
		let { xScale, yScale, xAccessor, yAccessor, plotData, type } = this.context;

		var first = xAccessor(plotData[0]);
		var last = xAccessor(plotData[plotData.length - 1]);

		/* return <line x1={xScale(first)}
			y1={yScale(0)}
			x2={xScale(last)}
			y2={yScale(0)} className="horizontal" />; */
		return <StraightLine
			stroke="black" opacity={0.3} type={type}
			x1={xScale(first)}
			y1={yScale(0)}
			x2={xScale(last)}
			y2={yScale(0)} />;
	}
	render() {
		// if (this.context.type !== "svg") return null;
		let { indicatorOptions, xScale, yScale, xAccessor, yAccessor, plotData, type } = this.context;
		return (
			<g className="macd-series">
				<Line
					xScale={xScale} yScale={yScale}
					xAccessor={xAccessor} yAccessor={(d) => yAccessor(d) && yAccessor(d).MACDLine}
					data={plotData}
					stroke={indicatorOptions.stroke.MACDLine} fill="none" 
					type={type} />
				<Line
					xScale={xScale} yScale={yScale}
					xAccessor={xAccessor} yAccessor={(d) => yAccessor(d) && yAccessor(d).signalLine}
					data={plotData}
					stroke={indicatorOptions.stroke.signalLine} fill="none"
					type={type} />
				<HistogramSeries baseAt={this.context.yScale(0)} className="macd-histogram"
					stroke={indicatorOptions.stroke.histogram} fill={indicatorOptions.fill.histogram} />
				{this.getHorizontalLine()}
			</g>
		);
	}
}

/*
				<path d={this.getMACDLine()} stroke={indicatorOptions.stroke.MACDLine} fill="none"/>
				<path d={this.getSignalLine()} stroke={indicatorOptions.stroke.signalLine} fill="none"/>

*/
//  className="macdline" 
//  className="signalline" 
MACDSeries.contextTypes = {
	xScale: React.PropTypes.func.isRequired,
	yScale: React.PropTypes.func.isRequired,
	xAccessor: React.PropTypes.func.isRequired,
	yAccessor: React.PropTypes.func.isRequired,
	plotData: React.PropTypes.array.isRequired,
	indicatorOptions: React.PropTypes.object.isRequired,
	canvasContext: React.PropTypes.object,
	type: React.PropTypes.string,
};

MACDSeries.childContextTypes = {
	yAccessor: React.PropTypes.func.isRequired,
};

MACDSeries.defaultProps = { namespace: "ReStock.MACDSeries" };

module.exports = MACDSeries;
