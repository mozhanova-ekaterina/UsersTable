import { useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Modal from "./Modal";

export default function UserTable({ users, sortConfig, onSort }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <table className="user-table">
        <thead>
          <tr>
            <TableHeader
              label="ФИО"
              sortKey="fullName"
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <TableHeader
              label="Возраст"
              sortKey="age"
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <TableHeader
              label="Пол"
              sortKey="gender"
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <TableHeader
              label="Телефон"
              sortKey="phone"
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <th>Email</th>
            <th>Страна</th>
            <th>Город</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.id} user={user} onClick={setSelectedUser} />
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <Modal onClose={() => setSelectedUser(null)}>
          <h2>
            {selectedUser.lastName} {selectedUser.firstName}{" "}
            {selectedUser.maidenName}
          </h2>
          <img
            src={selectedUser.image}
            alt="avatar"
            style={{ width: "100px", borderRadius: "50%" }}
          />
          <p>Возраст: {selectedUser.age}</p>
          <p>Пол: {selectedUser.gender}</p>
          <p>Телефон: {selectedUser.phone}</p>
          <p>Email: {selectedUser.email}</p>
          <p>
            Адрес: {selectedUser.address.country}, {selectedUser.address.city},{" "}
            {selectedUser.address.address}
          </p>
          <p>Рост: {selectedUser.height} см</p>
          <p>Вес: {selectedUser.weight} кг</p>
        </Modal>
      )}
    </>
  );
}
