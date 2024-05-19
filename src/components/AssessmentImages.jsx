import { Carousel, Image } from "antd";

const AssessmentImages = ({ imgs, setResult, num }) => {
  const handleClick = (index) => {
    let score = getScore(index);
    console.log(score);
    setResult(num, score);
  };
  const getScore = (score) => {
    switch (score) {
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 3;
      case 3:
        return 2;
      case 4:
        return 1;
    }
  };
  return (
    <Carousel infinite={false}>
      {imgs.map((item, index) => {
        return (
          <>
            <Image
              key={item}
              src={item}
              className="flex justify-center items-center"
              preview={false}
              onClick={() => handleClick(index)}
            />
            <p className="text-black text-2xl text-center" key={index}>
              {getScore(index)}
            </p>
          </>
        );
      })}
    </Carousel>
  );
};

export default AssessmentImages;
