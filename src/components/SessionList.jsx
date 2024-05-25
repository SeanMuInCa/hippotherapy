import { List, Button } from "antd";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useSessionStore from "../store/useSession";
const SessionList = (props) => {
  const [loading, setLoading] = useState(false);
  const [state, action] = useSessionStore.useStore();
  // const [data, setData] = useState([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    //get data
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  //   let data = state.sessionList[props.patientId];
  //   const [props.sessionData, setprops.sessionData] = useState(state.sessionList[props.patientId]);
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
        next={loadMoreData}
        hasMore={props.sessionData.length < 50}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={props.sessionData}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={"Session id: " + item.sessionId}
                description={item.date}
              />
              <div>{item.length}</div>
              <div
                onClick={() => props.chooseSession(item.sessionId, item.end)}
              >
                {item.end ? "Detail" : "Continue"}
              </div>
              {/* {!item.end && (
                <Button
                  className="ml-2"
                  onClick={() => endSession(item.sessionId)}
                >
                  end session
                </Button>
              )} */}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default SessionList;
