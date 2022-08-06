export const formatText = (data, backupData) => {
  if (data === undefined && backupData === undefined) {
    return <div>{null}</div>;
  }
  if (data === undefined || data.text === undefined) {
    return <div>{backupData}</div>;
  }

  // split formatted_text into array of words
  let pieces = data.text.split("{}");
  let string = `${pieces[0]}`;

  if (pieces.length === 1 && data.entities === undefined) {
    return <div>{string}</div>;
  }
  if (pieces.length > 1 && data.entities === undefined) {
    return <div>{backupData}</div>;
  }
  if (pieces.length !== data.entities.length + 1) {
    return <div>{backupData}</div>;
  }
  // delete first piece as it is already added to string
  pieces = pieces.slice(1);
  const { entities } = data;

  // for every entity, add a span with the entity's text
  for (let i = 0; i < entities.length; i += 1) {
    if (entities[i].text === undefined || entities[i].text === "") {
      return <div>{backupData}</div>;
    }
    string = `${string} <a ${
      entities[i].url === undefined ? `` : `href="${entities[i].url}"`
    } style=color:${entities[i].color};z-index:100;font-style:${
      entities[i].font_style === undefined ? `` : entities[i].font_style
    };>${entities[i].text}</a> ${pieces[0]}`;

    // after iterating, delete the piece from the array
    pieces = pieces.slice(1);
  }
  if (string === "" && backupData !== undefined) {
    return <div>{backupData}</div>;
  }
  return (
    <div>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: string }} />
    </div>
  );
};
