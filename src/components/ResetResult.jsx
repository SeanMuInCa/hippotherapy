import { Button, Result, ConfigProvider } from "antd";
import { useNavigate, useParams } from "react-router-dom";
// 解码
function decodeBase64(encodedText) {
	return new TextDecoder().decode(
		Uint8Array.from(atob(encodedText), (c) => c.charCodeAt(0))
	);
}
const ResetResult = () => {
    const nav = useNavigate();
    const goLogin = () => {
		nav("/login");
	};
	const { pwd } = useParams();
	const password = decodeBase64(pwd);
	return (
		<ConfigProvider
        theme={{
            token: {
                colorTextHeading: '#f40',
            },
        }}>
			{" "}
			<Result
				title={
					`Your password is ` + password
				}
                subTitle={"please keep your password and security question in a save place"}
				extra={
					<Button type="primary" key="console" onClick={goLogin}>
						Got it
					</Button>
				}
			/>
		</ConfigProvider>
	);
};

export default ResetResult;
