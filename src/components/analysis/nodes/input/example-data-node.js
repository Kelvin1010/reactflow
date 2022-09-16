import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NodeContainer } from "../../node-container";
import countries_indicators from "../../../../data/countries_indicators.json";
import ufo_signhtings from "../../../../data/ufo-signhtings.json";

function ExampleData({ onCallback, data }) {
  const [option, setOption] = useState("");

  useEffect(() => {
    var value = data?.input?.option ?? "countries_indicators";
    (async function () {
      const output = await fakeApi(value);
      setOption(value);
      onCallback({ output, input: { option: value } });
    })();
  }, []);

  async function handleChange(event) {
    const value = event.target.value;
    const output = await fakeApi(value);
    setOption(value);
    onCallback({ output, input: { option: value } });
  }

  return (
    <Select value={option} onChange={handleChange}>
      <option value="countries_indicators">Countries Indicator</option>
      <option value="ufo_signhtings">UFO Sightings</option>
    </Select>
  );
}

async function fakeApi(option) {
  switch (option) {
    case "countries_indicators":
      return countries_indicators;
    case "ufo_signhtings":
      return ufo_signhtings;
    default:
      return [];
  }
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "example-data")} draggable>
      Dữ liệu mẫu
    </div>
  );
}

export function ExampleDataWrapper(props) {
  return (
    <NodeContainer {...props} label="Dữ liệu mẫu">
      <ExampleData />
    </NodeContainer>
  );
}

ExampleDataWrapper.Sidebar = Sidebar;
