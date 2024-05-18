const nameArr = ["Peanut", "Baby"];
const eyes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const mouth = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const nose = [1, 2, 3, 4, 5];
const getRandom = (max) => Math.floor(Math.random() * max);


const avatar = () => {
    const img = `https://api.dicebear.com/8.x/lorelei/svg?
    seed=${nameArr[getRandom(nameArr.length)]}&eyes=variant0${eyes[getRandom(eyes.length)]}&mouth=happy0${mouth[getRandom(mouth.length)]}&nose=variant0${nose[getRandom(nose.length)]}`;
    return img;
  
};

export default avatar;
