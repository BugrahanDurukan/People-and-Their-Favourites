import React from "react";


function Homepage() {
  const [users, setUsers] = React.useState([]);
  const [pageItemIndex, setPageItemIndex] = React.useState(0);
  const getUsers =() => {
    fetch("http://localhost:8080/people").then((response)=>response.json())
    .then((re)=> {
      setUsers(re);
      console.log(users)
    });
  }
  const deleteUsers = (user) => {
    fetch("http://localhost:8080/delete/" + user).then((response)=>response.json())
    .then((re)=> {
      console.log(re)
      //to delete user from other user's favorites as well
      getUsers();
    });
  }

  const handlePagination = (firstItemIndex) =>{
    setPageItemIndex(firstItemIndex);
  }

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <img src="http://localhost:8080/img/title.jpg" alt=""></img>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Fullname</th>
            <th>Favorites</th>
            <th></th>
          </tr>
          {users.length <= 0 ? (<tr><td colSpan="5">List is empty</td></tr>) : 
            users.slice(pageItemIndex, pageItemIndex + 3).map((u)=>(
            <tr>
              <td>{u.id}</td>
              <td><img id="uImg" src={"http://localhost:8080/img/" + u.id + ".png"} alt=""></img></td>
              <td>{u.name}{u.lastname}</td>
              <td>{u.favorites.map((fav) => (<img id="favImg" src={"http://localhost:8080/img/" + fav + ".png"} alt=""></img>))}</td>
              <td>
                <button onClick={() => deleteUsers(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
      <button onClick={() => handlePagination(0)}>1</button>
      <button onClick={() => handlePagination(3)}>2</button>
      <button onClick={() => handlePagination(6)}>3</button>
    </>
  );
};

export default Homepage;