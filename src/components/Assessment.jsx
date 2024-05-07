import { Image, Form,Input } from "antd";

export default function Assessment() {
    const imgData = ['https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
        'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
        'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
        'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
    ];
    const handleClick = (index)=>{
        console.log(index);
    };
	return (
		<Form>
			<Form.Item
            className="flex justify-around items-center"
            name="head"
            label="Head"
            rules={[
                {
                  required: true,
                  message: "Please input your assessment!",
                },
              ]}
            >
            <Image.PreviewGroup preview={{
                movable:false,
            }}>
				{
                    imgData.map((item,index) =>(
                        <Image width={100} src={item} key={index} onClick={()=>handleClick(index)}/>
                    ))
                }
				<Input className="w-20"></Input>
			</Image.PreviewGroup>
            
            </Form.Item>
		</Form>
	);
}
