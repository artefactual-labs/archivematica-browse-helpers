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

export function format_entries(data, parent_path, parent = null) {
  let directories = [];
  let files = [];
  for (let index = 0; index < data.entries.length; ++index) {
    let element = data.entries[index];
    let child = {
      title: element,
      path: parent_path ? parent_path + '/' + element : element,
      display: true,
      properties: data.properties[element],
    };

    if (parent !== null) {
      child.parent = parent;
    }

    if (data.directories.indexOf(element) > -1) {
      // directory
      child.has_children = true;
      child.children = [];
      child.children_fetched = false;
      child.directory = true;
      directories.push(child);
    } else {
      // file
      child.has_children = false;
      child.directory = false;
      files.push(child);
    }
  }
  return directories.concat(files);
}
