import { List } from "antd";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getSessionInfo } from "@/api/session.js";
/**
 * this is the session list component
 * @param {props} - data of the session detail
 * @returns
 */
const SessionList = (props) => {
  const [sessionData, setSessionData] = useState([]);
  const getData = async () => {
    //get data
    const res = await getSessionInfo(props.sessionData.session_id);
    console.log("sessionlist", res);
    if (res.status == 200) {
      setSessionData(res.data.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 300,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={props.sessionData.length}
        next={getData}
        hasMore={props.sessionData.length < 50}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={props.sessionData}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              onClick={() =>
                props.chooseSession(item.session_id, item.end_session)
              }
            >
              <List.Item.Meta
                title={"Session id: " + item.session_id}
                description={item.date}
              />
              <div>{item.length}</div>
              <div>{item.end_session ? "Detail" : "Continue"}</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default SessionList;
