class PatientsController < ApplicationController
  before_action :authorize_user

  def index #get '/patients'
    render json: Patient.all, status: :ok 
  end

  def create #post '/patients'
    patient = Patient.create!(patient_params)
    render json: patient, status: :created 
  end

  def show #get '/patients/:id'
    find_patient_by_id
    render json: @patient, serializer: PatientSerializer, status: :ok 
  end

  def update #patch '/patients/:id'
    find_patient_by_id
    if @patient.update(patient_params)
      render json: @patient, status: :accepted 
    else  
      render json: { errors: @patient.errors.full_messages }, status: :unprocessable_entity
    end 
  end

  def destroy #delete '/patients/:id'
    find_patient_by_id
    @patient.destroy 
    head :no_content
  end

  private

  def patient_params
    params.require(:patient).permit(:first_name, :last_name, :guardian, :gender, :dob, :address, :phone, :email, :allergies, :notes, :id, :language_preferences, :viewed_notice_of_privacy_practices, :created_at)
  end 

  def find_patient_by_id
    @patient = Patient.find(params[:id])
  end 
end 