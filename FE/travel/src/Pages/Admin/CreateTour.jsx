import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr';
import { getToursById } from '../../api/Tour';

const CreateTour = () => {
  const {id} = useParams();
  const {data, mutate} = useSWR(id? ["", {id}]: null, ([_, params]) => getToursById(params));

  const [tour, setTour] = useState({
    code: data?.code
  })
  return (
    <div>CreateTour</div>
  )
}

export default CreateTour