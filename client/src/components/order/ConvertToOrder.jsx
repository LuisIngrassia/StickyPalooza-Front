import api from '../../api/Api';
import { useNavigate } from 'react-router-dom';

const ConvertToOrder = ({ cartId, onConvert }) => {

  const navigate = useNavigate();

  const handleConvert = async () => {
    try {
      const response = await api.post(`/orders/fromCart/${cartId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      onConvert(response.data);
      navigate('/order');
      
    } catch (err) {
      console.error('Error converting cart to order:', err);
    }
  };

  return (
    <button onClick={handleConvert} className="w-1/2 h-10 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition duration-200">
      Convert Cart to Order
    </button>
  );
};

export default ConvertToOrder;
