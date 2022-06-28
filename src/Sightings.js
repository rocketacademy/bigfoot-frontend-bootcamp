import { Link, Outlet } from "react-router-dom";
export default function Sightings(props) {
  const display = (props) => {
    return (
      <div>
        <Outlet />
        <h1>Sightings</h1>
        {props.sightings.sightings && props.sightings.sightings.length > 0
          ? props.sightings.sightings.map((data, index) => (
              <div
                key={data.REPORT_NUMBER}
                style={{
                  borderRadis: "25%",
                  border: "solid 3px black",
                  margin: "10px",
                }}
              >
                <h4>
                  {data.YEAR} - {data.MONTH} -- {data.STATE} - {data.COUNTY}{" "}
                </h4>
                <h5>
                  {data.LOCATION_DETAILS} - {data.TIME_AND_CONDITIONS}
                </h5>
                <h6>{data.OBSERVED}</h6>
                <p>
                  {data.OTHER_STORIES} - {data.OTHER_WITNESSES}
                </p>
                {/*  Implemented nested routing?  */}
                <Link to={`/sightings/${index}`}>Learn much more!</Link>
              </div>
            ))
          : null}
      </div>
    );
  };

  return <>{display(props)}</>;
}
