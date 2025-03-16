import StarRatings from "react-star-ratings";
const TestimonialCard = ({ testimonialData }) => {
  const { name, image, location, age, feedback, rating } = testimonialData;
  return (
    <div className="p-8 bg-white rounded-2xl space-y-8 text-text transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <figure>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="54"
          height="44"
          viewBox="0 0 54 44"
          fill="none"
        >
          <path
            d="M22.077 9.22678C14.3548 11.094 9.10367 18.2517 8.79478 26.3431C9.72144 26.0319 10.8026 25.8763 12.0381 25.8763C17.1348 25.8763 20.3781 29.7663 20.3781 34.4344C20.3781 39.1025 17.1348 43.1482 11.4203 43.1482C4.47034 43.1482 0.763672 37.0797 0.763672 28.2103C0.763672 16.8513 6.787 3.62508 22.077 0.357422V9.22678ZM32.1159 28.2103C32.1159 16.8513 38.1392 3.62508 53.4292 0.357422V9.22678C45.707 11.094 40.4559 18.2517 40.147 26.3431C41.0737 26.0319 42.1548 25.8763 43.3903 25.8763C48.487 25.8763 51.7303 29.7663 51.7303 34.4344C51.7303 39.1025 48.487 43.1482 42.7725 43.1482C35.8225 43.1482 32.1159 37.0797 32.1159 28.2103Z"
            fill="#D4F2CF"
          ></path>
        </svg>
      </figure>
      <h4>{feedback.slice(0, 290)}....</h4>
      <StarRatings
        rating={rating}
        starRatedColor="gold"
        numberOfStars={5}
        starDimension="24px"
        starSpacing="2px"
        name="rating"
      />
      <div className="flex lg:flex-row flex-col items-start gap-4">
        <figure className="mb-4">
          <img
            className="w-12 h-12 my-auto rounded-full object-cover"
            src={image}
            alt=""
          />
        </figure>
        <div>
          <span className="flex items-center">
            <h4 className="text-xl font-bold">{name}</h4>
            <p className="font-semibold">({age})</p>
          </span>
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
