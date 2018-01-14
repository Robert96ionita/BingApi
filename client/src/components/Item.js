import React from 'react';

export function Item(props) {
    const {name, rating, id, posterPath, summary, like, liked} = props;
    const DEFAULT_IMG = "http://braou.ac.in/wp-content/themes/braou/images/noimagefound.jpg";
    console.log(liked);
    return (
        <div id={"item-" + id} className={"search-item"}>
            <img src={posterPath} height={"120"} width={"100"} onError={(e)=>{e.target.src=DEFAULT_IMG}}/>
            <span style={{display: "inline"}}>
                <strong style={{padding: "5px", fontSize: "30px"}}>{name}</strong>
                {liked ? (
                    <span className="glyphicon glyphicon-heart"> Liked </span>
                ) : (
                    <a id={id} className="btn btn-info btn-lg" onClick={(e) => like(e.target.id)}>
                        <span className="glyphicon glyphicon-heart"></span> Like
                    </a>
                )}

            </span>
                <p style={{fontSize: "14px"}}>{summary}</p>
            <p>Rating:
                {rating !== 0 ? rating : " Not rated yet" }
            </p>
            <hr/>
        </div>
    )
}