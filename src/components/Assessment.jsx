import { useState } from "react";
import { Table, Button, notification } from "antd";
import AssessmentImages from "./AssessmentImages";

import {
  headArr,
  trunkArr,
  pelvicArr,
  headAntArr,
  thoracicArr,
  lumbarArr,
  trunkInclinationArr,
  pelvicTiltArr,
  hipArr,
  kneeArr,
  elbowArr,
} from "@/utils/assessmentHelper";
const Assessment = () => {
  const checkAll = () => {
    return result.find((item) => item === 0);
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (title) => {
    api.info({
      message: `${title}`,
    });
  };
  //show score
  const [result, setResult] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  //actual score
  const [value, setValue] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
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
  const handleValue = (index, score) => {
    console.log("@", index, score);
    setValue((prevState) => {
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
      
    },
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
      img: <AssessmentImages num={0} imgs={headArr} setResult={handleResult} setValue={handleValue}/>,
      score: getScore(result[0]),
    },
    {
      key: "1",
      part: "Trunk Lateral Shift",
      img: (
        <AssessmentImages num={1} imgs={trunkArr} setResult={handleResult} setValue={handleValue}/>
      ),
      score: getScore(result[1]),
    },
    {
      key: "2",
      part: "Pelvic Obliquity",
      img: (
        <AssessmentImages num={2} imgs={pelvicArr} setResult={handleResult} setValue={handleValue}/>
      ),
      score: getScore(result[2]),
    },
    {
      key: "3",
      part: "Head Ant/Post Tilt",
      img: (
        <AssessmentImages num={3} imgs={headAntArr} setResult={handleResult} setValue={handleValue}/>
      ),
      score: getScore(result[3]),
    },
    {
      key: "4",
      part: "Thoracic curve",
      img: (
        <AssessmentImages num={4} imgs={thoracicArr} setResult={handleResult} setValue={handleValue}/>
      ),
      score: getScore(result[4]),
    },
    {
      key: "5",
      part: "Lumbar curve",
      img: (
        <AssessmentImages num={5} imgs={lumbarArr} setResult={handleResult} setValue={handleValue}/>
      ),
      score: getScore(result[5]),
    },
    {
      key: "6",
      part: "Trunk Inclination",
      img: (
        <AssessmentImages
          num={6}
          imgs={trunkInclinationArr}
          setResult={handleResult}
          setValue={handleValue}
        />
      ),
      score: getScore(result[6]),
    },
    {
      key: "7",
      part: "Pelvic Tilt",
      img: (
        <AssessmentImages
          num={7}
          imgs={pelvicTiltArr}
          setResult={handleResult}
          setValue={handleValue}
        />
      ),
      score: getScore(result[7]),
    },
    {
      key: "8",
      part: "Hip Flex",
      img: <AssessmentImages num={8} imgs={hipArr} setResult={handleResult} setValue={handleValue}/>,
      score: getScore(result[8]),
    },
    {
      key: "9",
      part: "Knee Ext/Flex",
      img: <AssessmentImages num={9} imgs={kneeArr} setResult={handleResult} setValue={handleValue}/>,
      score: getScore(result[9]),
    },
    {
      key: "10",
      part: "Elbow Flexion/Extension",
      img: (
        <AssessmentImages num={10} imgs={elbowArr} setResult={handleResult} setValue={handleValue}/>
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
