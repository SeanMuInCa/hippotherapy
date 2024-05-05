import { Input,Button } from '@douyinfe/semi-ui';
export default function Login() {
    return (
        <div className="flex flex-col items-center">
            <img src="../../public/cat.jpg" alt="" style={{width:500}}/>
            <div className="mt-5 w-96">
                <Input placeholder="account" size='large'/>
            </div>
            <div className="mt-5 w-96">
                <Input placeholder="password" size='large' mode='password'/>
            </div>
            <div className="mt-10">
                <Button type="primary" block={true}>
                    Login
                </Button>
            </div>
        </div>
    );
}
