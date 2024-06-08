import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Button, notification, message } from "antd";
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
import { newAssessment } from "@/api";
/**
 * this component is about assessment
 * @returns
 */
const Assessment = () => {
  const nav = useNavigate();
  /**
   * check if user clicked all items
   * @returns
   */
  const checkAll = () => {
    return result.find((item) => item === 0);
  };
  const par = useParams();
  const patientId = par.patientId;
  const sessionId = par.id;
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
  const titleEnum = {
    0: "head",
    1: "trunk",
    2: "pelvic",
    3: "headAnt",
    4: "thoracic",
    5: "lumbar",
    6: "trunkInclination",
    7: "pelvicTilt",
    8: "hip",
    9: "knee",
    10: "elbow",
  };
  const flagEnum = {
    0: "headFlag",
    1: "trunkFlag",
    2: "pelvicFlag",
    3: "headAntFlag",
    4: "thoracicFlag",
    5: "lumbarFlag",
    6: "trunkInclinationFlag",
    7: "pelvicTiltFlag",
    8: "hipFlag",
    9: "kneeFlag",
    10: "elbowFlag",
  };
  const valueEnum = {
    1: "left",
    2: "left",
    3: "center",
    4: "right",
    5: "right",
  };
  const submit = async () => {
    let res = checkAll();
    if (typeof res == "undefined") {
      console.log("done");
      console.log(value);
      const obj = value.reduce((acc, value, index) => {
        const key = titleEnum[index];
        const flagKey = flagEnum[index];
        const val = valueEnum[value];

        acc[key] = value;
        acc[flagKey] = val;
        return acc;
      }, {});
      obj.sessionId = parseInt(sessionId);
      console.log(obj);
      const res = await newAssessment(obj);
      if (res.data.success) {
        message.success(res.data.message);
      }
      nav("/assessmentresult/" + patientId + "/" + sessionId);
      return;
    }
    console.log("has 0");
    openNotification("you have to finish all the steps");
  };
  /**
   * transfer actual score to present score
   * @param {int} score - actual score
   * @returns show score
   */
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
  /**
   * save scores
   * @param {int} index score at the position
   * @param {int} score score
   */
  const handleResult = (index, score) => {
    setResult((prevState) => {
      const newState = [...prevState];

      newState[index] = score;

      return newState;
    });
  };
  /**
   * save actual scores
   * @param {int} index score at the position
   * @param {int} score score
   */
  const handleValue = (index, score) => {
    setValue((prevState) => {
      const newState = [...prevState];

      newState[index] = score;

      return newState;
    });
  };
  /**
   * table structure
   */
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
  /**
   * table data
   */
  const data = [
    {
      key: "0",
      part: "Head Later Tilt",
      img: (
        <AssessmentImages
          num={0}
          imgs={headArr}
          defaultIndex={2} //default image index
          setResult={handleResult}
          setValue={handleValue}
        />
      ),
      score: getScore(result[0]),
    },
    {
      key: "1",
      part: "Trunk Lateral Shift",
      img: (
        <AssessmentImages
          num={1}
          imgs={trunkArr}
          defaultIndex={2}
          setResult={handleResult}
          setValue={handleValue}
        />
      ),
      score: getScore(result[1]),
    },
    {
      key: "2",
      part: "Pelvic Obliquity",
      img: (
        <AssessmentImages
          num={2}
          imgs={pelvicArr}
          defaultIndex={2}
          setResult={handleResult}
          setValue={handleValue}
        />
      ),
      score: getScore(result[2]),
    },
    {
      key: "3",
      part: "Head Ant/Post Tilt",
      img: (
        <AssessmentImages
          num={3}
          imgs={headAntArr}
          defaultIndex={2}
          setResult={handleResult}
          setValue={handleValue}
        />
      ),
      score: getScore(result[3]),
    },
    {
      key: "4",
      part: "Thoracic curve",
      img: (
        <AssessmentImages
          num={4}
          imgs={thoracicArr}
          defaultIndex={2}
          setResult={handleResult}
          setValue={handleValue}
        />
      ),
      score: getScore(result[4]),
    },
    {
      key: "5",
      part: "Lumbar curve",
      img: (
        <AssessmentImages
          num={5}
          imgs={lumbarArr}
          defaultIndex={2}
          setResult={handleResult}
          setValue={handleValue}
        />
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
          defaultIndex={2}
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
          defaultIndex={2}
          setResult={handleResult}
          setValue={handleValue}
        />
      ),
      score: getScore(result[7]),
    },
    {
      key: "8",
      part: "Hip Flex",
      img: (
        <AssessmentImages
          num={8}
          imgs={hipArr}
          defaultIndex={1}
          setResult={handleResult}
          setValue={handleValue}
        />
      ),
      score: getScore(result[8]),
    },
    {
      key: "9",
      part: "Knee Ext/Flex",
      img: (
        <AssessmentImages
          num={9}
          imgs={kneeArr}
          defaultIndex={2}
          setResult={handleResult}
          setValue={handleValue}
        />
      ),
      score: getScore(result[9]),
    },
    {
      key: "10",
      part: "Elbow Flexion/Extension",
      img: (
        <AssessmentImages
          num={10}
          imgs={elbowArr}
          defaultIndex={1}
          setResult={handleResult}
          setValue={handleValue}
        />
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
