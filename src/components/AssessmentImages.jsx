import { Carousel, Image } from "antd";
import { useEffect, useRef } from "react";
/**
 * this component is for deal with the images in assessment
 * @param {imgs} -the images for one item
 * @param {setResult} -the function that set the score to result array to show in the assessment page
 * @param {num} -the number of the item
 * @param {setValue} -the function that set the score to value array to send to back-end to store
 * @param {defaultIndex} -the default image show to the user, normally is the 3rd one
 * @returns {Carousel} -the component from antd for images presentation on mobile device
 */
const AssessmentImages = ({ imgs, setResult, num, setValue, defaultIndex }) => {
	const handleClick = (index) => {
		setValue(num, index + 1);
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
	const carouselRef = useRef(null);
	useEffect(() => {
		if (carouselRef.current) {
			console.log(carouselRef, "@@");
			// carouselRef.current.next();
			// carouselRef.current.next();
      carouselRef.current.goTo(defaultIndex);
		}
	}, []);
	return (
		<Carousel infinite={false} arrows={true} ref={carouselRef}>
			{imgs.map((item, index) => {
				return (
					<div key={index} className="text-center">
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
					</div>
				);
			})}
		</Carousel>
	);
};

export default AssessmentImages;
