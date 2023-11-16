const mapThreadDbToModel = ({ id, title, publisher }) => ({
  id,
  title,
  owner: publisher,
});

const mapCommentDbToModel = ({ id, content, publisher }) => ({
  id,
  content,
  owner: publisher,
});

const getMapCommentDbToModel = ({
  id,
  date,
  content,
  is_delete,
  username,
}) => ({
  id,
  date,
  content,
  is_delete: is_delete,
  username,
});

module.exports = {
  mapThreadDbToModel,
  mapCommentDbToModel,
  getMapCommentDbToModel,
};
