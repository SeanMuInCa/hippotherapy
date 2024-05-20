import { useState } from "react";
import { Table, Button, Image, notification } from "antd";
import AssessmentImages from "./AssessmentImages";

import { headArr, trunkArr } from "@/utils/assessmentHelper";
const Assessment = () => {

  const [clickedButtons, setClickedButtons] = useState({});
  const handleButtonClick = (record, buttonId) => {
    console.log(`Button ${buttonId} clicked in row:`, record);
    setClickedButtons((prevState) => ({
      ...prevState,
      [record.key]: buttonId,
    }));
    setResult((prevState) => {
      // 创建副本
      const newState = [...prevState];
      // 修改副本中对应位置的值
      newState[record.key] = buttonId;
      // 返回新的状态
      return newState;
    });
  };
  const checkAll = () => {
    return result.find((item) => item === 0);
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (title) => {
    api.info({
      message: `${title}`,
    });
  };
  const [result, setResult] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const submit = () => {
    let res = checkAll();
    console.log(typeof res);
    if (typeof res == "undefined") {
      console.log("done"); //submit here
      return;
    }
    console.log("has 0");
    openNotification("you have to finish all the steps");
  };
  const getScore = (score) => {
    switch (score) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 2;
      case 5:
        return 1;
    }
  };
  const handleResult = (index, score) => {
    console.log("@", index, score);
    setResult((prevState) => {
      // 创建副本
      const newState = [...prevState];
      // 修改副本中对应位置的值
      newState[index] = score;
      // 返回新的状态
      return newState;
    });
  };
  const columns = [
    {
      title: "Part",
      dataIndex: "part",
      key: "part",
    },
    {
      title: "Seated postural control measure",
      dataIndex: "img",
      key: "img",
      width: "50%",
      // render: () => (
      // 	<>
      // 		<Image
      // 			src={img}
      // 			style={{ width: 500, height:100 }}
      // 		/>
      // 	</>
      // ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <span>
    //       <Button
    //         onClick={() => handleButtonClick(record, 1)}
    //         style={{
    //           background:
    //             clickedButtons[record.key] === 1 ? "#1677FF" : "inherit",
    //         }}
    //       >
    //         1
    //       </Button>
    //       <Button
    //         onClick={() => handleButtonClick(record, 2)}
    //         style={{
    //           background:
    //             clickedButtons[record.key] === 2 ? "#1677FF" : "inherit",
    //         }}
    //       >
    //         2
    //       </Button>
    //       <Button
    //         onClick={() => handleButtonClick(record, 3)}
    //         style={{
    //           background:
    //             clickedButtons[record.key] === 3 ? "#1677FF" : "inherit",
    //         }}
    //       >
    //         3
    //       </Button>
    //       <Button
    //         onClick={() => handleButtonClick(record, 4)}
    //         style={{
    //           background:
    //             clickedButtons[record.key] === 4 ? "#1677FF" : "inherit",
    //         }}
    //       >
    //         2
    //       </Button>
    //       <Button
    //         onClick={() => handleButtonClick(record, 5)}
    //         style={{
    //           background:
    //             clickedButtons[record.key] === 5 ? "#1677FF" : "inherit",
    //         }}
    //       >
    //         1
    //       </Button>
    //     </span>
    //   ),
    // },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
  ];
  const data = [
    {
      key: "0",
      part: "Head Later Tilt",
      img: <AssessmentImages num={0} imgs={headArr} setResult={handleResult} />,
      score: getScore(result[0]),
    },
    {
      key: "1",
      part: "Trunk Lateral Shift",
      img: (
        <AssessmentImages num={1} imgs={trunkArr} setResult={handleResult}/>
      ),
      score: getScore(result[1]),
    },
    {
      key: "2",
      part: "Pelvic Obliquity",
      img: (
        <Image src="/images/pelvic1.png" style={{ width: 500, height: 100 }} />
      ),
      score: getScore(result[2]),
    },
    {
      key: "3",
      part: "Head Ant/Post Tilt",
      img: (
        <Image src="/images/head2.png" style={{ width: 500, height: 100 }} />
      ),
      score: getScore(result[3]),
    },
    {
      key: "4",
      part: "Thoracic curve",
      img: (
        <Image src="/images/thoracic.png" style={{ width: 500, height: 100 }} />
      ),
      score: getScore(result[4]),
    },
    {
      key: "5",
      part: "Lumbar curve",
      img: (
        <Image src="/images/lumbar.png" style={{ width: 500, height: 100 }} />
      ),
      score: getScore(result[5]),
    },
    {
      key: "6",
      part: "Trunk Inclination",
      img: (
        <Image src="/images/trunk2.png" style={{ width: 500, height: 100 }} />
      ),
      score: getScore(result[6]),
    },
    {
      key: "7",
      part: "Pelvic Tilt",
      img: (
        <Image src="/images/pelvic2.png" style={{ width: 500, height: 100 }} />
      ),
      score: getScore(result[7]),
    },
    {
      key: "8",
      part: "Hip Flex",
      img: <Image src="/images/hip.png" style={{ width: 500, height: 100 }} />,
      score: getScore(result[8]),
    },
    {
      key: "9",
      part: "Knee Ext/Flex",
      img: <Image src="/images/knee.png" style={{ width: 500, height: 100 }} />,
      score: getScore(result[9]),
    },
    {
      key: "10",
      part: "Elbow Flexion/Extension",
      img: (
        <Image src="/images/elbow.png" style={{ width: 500, height: 100 }} />
      ),
      score: getScore(result[10]),
    },
  ];
  return (
    <>
      {contextHolder}
      <Table
        className="mx-2 my-10"
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={true}
        scroll={{ y: 500 }}
      />
      <div className="flex">
        <Button type="primary" className="mx-auto my-10" onClick={submit}>
          Submit
        </Button>
      </div>
    </>
  );
};
export default Assessment;
