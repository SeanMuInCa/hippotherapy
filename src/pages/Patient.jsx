import CardTemp from "../components/CardTemp";

export default function Patient() {
    const data = [
        {
          id: 0,
          fName: "aaa0",
          lName: "bbb",
          email: "abc@abc.com",
          language: "english",
          number: "1231234567",
          gender: "male",
          location: "sk",
          history: "history",
          diagnosis: "diagnosis",
        },
        {
          id: 1,
          fName: "aaa1",
          lName: "bbb",
          email: "abc@abc.com",
          language: "english",
          number: "1231234567",
          gender: "male",
          location: "sk",
          history: "history",
          diagnosis: "diagnosis",
        },
        {
          id: 2,
          fName: "aaa2",
          lName: "bbb",
          email: "abc@abc.com",
          language: "english",
          number: "1231234567",
          gender: "male",
          location: "sk",
          history: "history",
          diagnosis: "diagnosis",
        },
        {
          id: 3,
          fName: "aaa3",
          lName: "bbb",
          email: "abc@abc.com",
          language: "english",
          number: "1231234567",
          gender: "male",
          location: "sk",
          history: "history",
          diagnosis: "diagnosis",
        },
      ];
  return (
    <>
        <div className="flex mx-5 flex-wrap">
        {data.map((item, i) => (
          <CardTemp key={i} data={item}></CardTemp>
        ))}
      </div>
    </>
  );
}
