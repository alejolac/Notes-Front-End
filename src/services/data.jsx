import axios from 'axios';

const baseUrl = 'https://notes-mongo-db-ten.vercel.app/api/notes';

const GetAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    throw error;
  }
};

const Create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error.message);
    throw error;
  }
};

const Update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error.message);
    alert('Error updating note: ' + error.message);
    throw error;
  }
};

const Delete = async (id) => {
  if (id === '64480ef9733d623b9428bfbc') {
    alert("You can't delete this note");
    return;
  }

  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting note:', error.message);
    throw error;
  }
};

export default { GetAll, Create, Update, Delete };
