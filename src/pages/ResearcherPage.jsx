import { Button, message } from "antd";
const ResearcherPage = () => {
  const handleDownload = () => {
    message.error("coming soon");
  };
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-3xl mb-5">Researcher Page</h1>
      <Button type="primary" onClick={handleDownload}>
        Download
      </Button>
    </div>
  );
};

export default ResearcherPage;
