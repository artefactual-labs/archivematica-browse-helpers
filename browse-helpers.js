import Base64 from 'base64-helpers';

export function decode_browse_response(response) {
  let new_response = {};
  Object.assign(new_response, response);

  ['entries', 'directories'].forEach(key => {
    new_response[key] = response[key].map(Base64.decode);
  });

  for (let key of Object.keys(response.properties)) {
    new_response.properties[Base64.decode(key)] = response.properties[key];
  }

  return new_response;
};

export function format_entries(data, parent_path) {
  return data.entries.map(element => {
    let child = {
      title: element,
      path: parent_path + '/' + element,
      display: true,
      properties: data.properties[element],
    };

    if (data.directories.indexOf(element) > -1) {
      // directory
      child.has_children = true;
      child.children = [];
      child.children_fetched = false;
      child.directory = true;
    } else {
      // file
      child.has_children = false;
      child.directory = false;
    }

    return child;
  });
}
