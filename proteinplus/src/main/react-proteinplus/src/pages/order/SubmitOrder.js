// import React, { useEffect, useState } from 'react';
// import axios from "axios";
//
// export default function SubmitCategory() {
//     const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;
//
//     // 전체 주문 조회
//     const [orders, setOrders] = useState([]);
//     const [orderByUserId, setOrderByUserId] = useState([]);
//     const [orderStatus, setOrderStatus] = useState([]);
//
//     useEffect(() => {
//         findAllOrders();
//     }, []);
//
//     // 전체 주문 조회
//     async function findAllOrders() {
//         try {
//             const response = await axios.get(`${Spring_Server_Ip}/api/admin/orders`);
//             console.log("orders = ", response.data);
//             setOrders(response.data);
//         } catch (error) {
//             console.error('전체 주문 조회 중 오류가 발생했습니다:', error);
//         }
//     }
//
//     // 회원별 주문 조회
//     async function findAllOrderByUserId(userId) {
//         try {
//             const response = await axios.get(`${Spring_Server_Ip}/api/admin/order/${userId}`);
//             console.log("orderByUserId = ", response.data);
//             setOrderByUserId(response.data);
//         } catch (error) {
//             console.error('회원별 주문 조회 중 오류가 발생했습니다:', error);
//         }
//     }
//
//     // 주문 삭제
//     const deleteOrder = async (orderId) => {
//         try {
//             await axios.delete(`${Spring_Server_Ip}/api/admin/order/${orderId}`);
//             // After deletion, fetch all orders again to update the list
//             findAllOrders();
//         } catch (error) {
//             console.error('주문 삭제 중 오류가 발생했습니다:', error);
//         }
//     };
//
//     // 주문 상태 업데이트
//     const updateOrderStatus = async (orderId, newStatus) => {
//         try {
//             await axios.put(`${Spring_Server_Ip}/api/admin/order/${orderId}/edit`, { status: newStatus });
//             // After updating status, fetch all orders again to update the list
//             findAllOrders();
//         } catch (error) {
//             console.error('배송상태 수정 중 오류가 발생했습니다:', error);
//         }
//     };
//
//     return (
//         <div>
//             <button onClick={findAllOrders}>전체 주문 조회</button>
//             <button onClick={() => findAllOrderByUserId(userId)}>유저별 주문 조회</button>
//             <table>
//                 <thead>
//                 <tr>
//                     <th>주문 ID</th>
//                     <th>주문 내용</th>
//                     <th>주문 상태</th>
//                     <th>배송상태 변경</th>
//                     <th>주문 삭제</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {orders.map(order => (
//                     <tr key={order.id}>
//                         <td>{order.id}</td>
//                         <td>{order.content}</td>
//                         <td>{order.status}</td>
//                         <td>
//                             <select onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
//                                 <option value="order">주문</option>
//                                 <option value="delivery">배송중</option>
//                                 <option value="complete">완료</option>
//                             </select>
//                         </td>
//                         <td>
//                             <button onClick={() => deleteOrder(order.id)}>주문 삭제</button>
//                         </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
