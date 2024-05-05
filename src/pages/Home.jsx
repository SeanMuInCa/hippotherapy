import { Button } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router-dom';
function Home() {
    const nav = useNavigate();
    const handleClick = ()=>{
        nav('/login');
    };
    return (
        <div className="">
            <h1>Home Page</h1>
            <div className="">
                <Button type="primary" onClick={handleClick}>Back to Login</Button>
            </div>
        </div>
    );
}

export default Home;