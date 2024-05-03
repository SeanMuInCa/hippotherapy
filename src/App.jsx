import "./index.css";
import { Layout } from "@douyinfe/semi-ui";
import Tobbar from "./components/Tobbar";
import PicCard from "./components/PicCard";
function App() {
  const { Header, Content } = Layout;

  const commonStyle = {
    height: 64,
    lineHeight: "64px",
    background: "var(--semi-color-fill-0)",
  };

  return (
    <Layout className="components-layout-demo">
      <Header style={commonStyle}>
        <Tobbar></Tobbar>
      </Header>
      <Content
        style={{ height: "calc(100vh - 128px)" }}
        className="flex justify-around flex-wrap mt-2"
      >
        <PicCard></PicCard>
      </Content>
    </Layout>
  );
}

export default App;
