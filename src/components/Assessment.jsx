import { Image, Form, Input, Table, Button } from "antd";
import { useState } from "react";

const { Column } = Table;

export default function Assessment() {
  const Data = [
    {
      id: 1,
      part: "head",
      score: 0,
      img: [
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
      ],
    },
    {
      id: 2,
      part: "shoulder",
      score: 0,
      img: [
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
      ],
    },
    {
      id: 3,
      part: "body",
      score: 0,
      img: [
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
      ],
    },
    {
      id: 4,
      part: "heap",
      score: 0,
      img: [
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
      ],
    },
  ];
  const handleClick = (index) => {
    console.log(index);
    Data[index].score = index;
    setScore(index);
  };
  const [score, setScore] = useState(0);
  const buttons = [];
  for (let i = 0; i < 5; i++) {
    buttons.push(
      <Button key={i} onClick={() => handleClick(i)}>
        {i + 1}
      </Button>,
    );
  }
  return (
    // <Form>
    //   <Form.Item
    //     className="flex justify-center"
    //     name="head"
    //     label="Head"
    //     style={{alignItems:"center"}}
    //     rules={[
    //       {
    //         required: true,
    //         message: "Please input your assessment!",
    //       },
    //     ]}
    //   >
    //     <Image.PreviewGroup
    //       preview={{
    //         movable: false,
    //       }}
    //     >
    //       {imgData.map((item, index) => (
    //         <Image
    //           width={100}
    //           src={item}
    //           key={index}
    //           onClick={() => handleClick(index)}
    //         />
    //       ))}
    //       <Input className="w-20"></Input>
    //     </Image.PreviewGroup>
    //   </Form.Item>
    // </Form>
    <Form>
      <Form.Item className="mx-10">
        <Table bordered dataSource={Data} pagination={false}>
          <Column title="part" dataIndex="part" key="part" />
          <Column
            title="img"
            dataIndex="img"
            key="img"
            render={(img) => (
              <>
                {img.map((item) => {
                  return <Image src={item} key={item} width={50} />;
                })}
              </>
            )}
          />
          <Column key="oper" title="operation" render={() => <>{buttons}</>} />
          <Column title="score" dataIndex="score" key="score" />
        </Table>
      </Form.Item>
    </Form>
  );
}
