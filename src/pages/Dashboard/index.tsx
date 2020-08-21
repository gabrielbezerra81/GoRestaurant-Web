/* eslint-disable no-console */
import React, { useState, useEffect, useCallback, useRef } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { Container, FoodsContainer } from './styles';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const foodsData: IFoodPlate[] = [
  {
    id: 0,
    name: 'Frango à parmegiana',
    available: true,
    price: '19,90',
    description: 'Filé de frango empanado com molho especial',
    image:
      'https://s2.glbimg.com/m8xzkTjTE_p4c81beNVuoFtb-Qk=/0x0:672x504/984x0/smart/filters:strip_icc()/s.glbimg.com/po/rc/media/2013/12/17/16_32_38_969_frango_a_parmegiana_receitadaclau.JPG',
  },
  {
    id: 1,
    name: 'Frango à parmegiana',
    available: true,
    price: '19,90',
    description: 'Filé de frango empanado com molho especial',
    image:
      'https://t1.rg.ltmcdn.com/pt/images/5/8/4/file_de_frango_a_parmegiana_no_forno_6485_600_square.jpg',
  },
  {
    id: 2,
    name: 'Frango à parmegiana',
    available: true,
    price: '19,90',
    description: 'Filé de frango empanado com molho especial',
    image:
      'https://t1.rg.ltmcdn.com/pt/images/5/8/4/file_de_frango_a_parmegiana_no_forno_6485_600_square.jpg',
  },
  {
    id: 3,
    name: 'Frango à parmegiana',
    available: true,
    price: '19,90',
    description: 'Filé de frango empanado com molho especial',
    image:
      'https://s2.glbimg.com/m8xzkTjTE_p4c81beNVuoFtb-Qk=/0x0:672x504/984x0/smart/filters:strip_icc()/s.glbimg.com/po/rc/media/2013/12/17/16_32_38_969_frango_a_parmegiana_receitadaclau.JPG',
  },
];

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const loadFoods = useCallback(() => {
    api
      .get<IFoodPlate[]>('foods')
      .then(response => {
        const formattedFoods = response.data.map(food => ({
          ...food,
          price: food.price.replace('.', ','),
        }));

        setFoods(formattedFoods);
      })
      .catch(console.log);
  }, []);

  const handleAddFood = useCallback(
    async (food: Omit<IFoodPlate, 'id' | 'available'>): Promise<void> => {
      try {
        const response = await api.post<IFoodPlate>('foods', {
          ...food,
          available: true,
        });
        setFoods(oldFoods => [...oldFoods, response.data]);
      } catch (err) {
        console.log(err);
      }
    },
    [],
  );

  const handleUpdateFood = useCallback(
    async (food: IFoodPlate): Promise<void> => {
      const { id, ...rest } = food;

      try {
        const response = await api.put<IFoodPlate>(`foods/${id}`, { ...rest });

        const foodIndex = foods.findIndex(foodItem => foodItem.id === id);

        foods[foodIndex] = response.data;

        setFoods(foods.map(foodItem => ({ ...foodItem })));
      } catch (error) {
        console.log(error);
      }
    },
    [foods],
  );

  const handleDeleteFood = useCallback(
    async (id: number): Promise<void> => {
      try {
        await api.delete(`foods/${id}`);

        const foodIndex = foods.findIndex(foodItem => foodItem.id === id);

        foods.splice(foodIndex, 1);

        setFoods(foods.map(foodItem => ({ ...foodItem })));
      } catch (error) {
        console.log(error);
      }
    },
    [foods],
  );

  const toggleModal = useCallback((): void => {
    setModalOpen(oldValue => !oldValue);
  }, []);

  const toggleEditModal = useCallback((): void => {
    setEditModalOpen(oldValue => !oldValue);
  }, []);

  const handleEditFood = useCallback((food: IFoodPlate): void => {
    setEditingFood(food);
  }, []);

  useEffect(() => {
    loadFoods();
  }, [loadFoods]);

  return (
    <Container className="container">
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
              toggleEditModal={toggleEditModal}
              handleUpdateFood={handleUpdateFood}
            />
          ))}
      </FoodsContainer>
    </Container>
  );
};

export default Dashboard;
