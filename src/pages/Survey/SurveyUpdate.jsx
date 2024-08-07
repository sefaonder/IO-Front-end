import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSurveyQuery } from 'src/store/services/survey/surveyApiSlice';
import SurveyAdd from './SurveyAdd';

const SurveyUpdate = () => {
  const { surveyId } = useParams();
  const { data, isLoading, isSuccess, isError, error } = useGetSurveyQuery(surveyId);
  console.log(data);
  return (
    <div>
      <SurveyAdd survey={data} surveyId={surveyId}></SurveyAdd>
    </div>
  );
};

export default SurveyUpdate;
