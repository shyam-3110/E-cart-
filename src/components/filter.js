import React, { Component } from 'react'

export default class filter extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    {this.props.count} Products Found
                </div>
                <div className="col-md-6">
                    <label>
                        Order By
                        <select className="form-control" value={this.props.sort} onChange={this.props.handleChnageSort}>
                            <option value="">Select</option>
                            <option value="lowest">Lowest to Highest</option>
                            <option value="highest">Highest to Lowest</option>
                        </select>
                    </label>
                    
                </div>
            </div>
        )
    }
}
