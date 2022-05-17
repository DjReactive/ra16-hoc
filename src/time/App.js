import React, {useState} from 'react';
import './App.css'
import { staticVideos } from './defines'
import { withDate } from './Wrapper'

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function Video(props) {
    const FormatedDateTime = withDate(DateTime, props.date);
    return (
        <div className="video">
          <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          <FormatedDateTime {...props} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} key={item.url} />);
}

export default function App() {
    const [list, setList] = useState(staticVideos);

    return (
        <VideoList list={list} />
    );
}
