class PatientsController < ApplicationController
  before_action :authorize_user

  def index
    patients = Patient.all 
    render json: patients 
  end

  def create
    patient = Patient.new(patient_params)
    if patient.save 
      render json: patient 
    else  
      render json: { errors: patient.errors.full_messages }, status: :unprocessable_entity
    end  
  end

  # blank appointment is being created by the `current_user.appointments.create`, this is creating a blank appointment because User had patients through appointments. 

  def show
    patient = Patient.find(params[:id])
    render json: patient 
  end

  def update
    patient = Patient.find(params[:id])
    if patient.update(patient_params)
      render json: patient 
    else  
      render json: { errors: patient.errors.full_messages }, status: :unprocessable_entity
    end 
  end

  def destroy
    patient = Patient.find(params[:id])
    patient.destroy 
    head :no_content
  end

  private

  def patient_params
    params.require(:patient).permit(:first_name, :last_name, :guardian, :gender, :dob, :address, :phone, :email, :allergies, :notes, :id, :language_preferences, :viewed_notice_of_privacy_practices, :created_at)
  end 
end 