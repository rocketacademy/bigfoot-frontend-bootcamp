export default function List({ sighting, index }) {
  return (
    <div>
      <ul key={index}>
        <li>Sighting {index + 1}</li>
        <li>Year: {sighting.YEAR}</li>
        <li>Season: {sighting.SEASON}</li>
        <li>Month: {sighting.MONTH}</li>
        <li>Country: {sighting.COUNTY}</li>
      </ul>
    </div>
  );
}
