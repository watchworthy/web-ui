// import { AwardList } from 'libs/watchworthy/src/lib/AwardList';

// import { Award as AwardType } from 'types/common';

// interface AwardProps {
//   award: AwardType;
// }

// export async function getServerSideProps(context) {
//   // Fetch award data for the specific id
//   const res = await fetchAwardDetails(context.params.award);
//   const award = await res;

//   return { props: { award } };
// }

// export const Award = ({ award }: AwardProps) => {
//   return (
//     <>
//       <h1>Award details</h1>
//       {/* Render the award details using appropriate components */}
//       {/* For example: */}
//       <p>Name: {award.name}</p>
//       <p>Category: {award.category}</p>
//       {/* Add more details as needed */}
//     </>
//   );
// };

// export default Award;
