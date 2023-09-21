class PatientsController < ApplicationController
  before_action :authorize_user, except: [:patient_appts]
  before_action :find_patient, only: [:show, :update, :destroy]
  before_action :is_authorized?, only: [:create]
  
  def index #get '/patients'
    render json: Patient.all, status: :ok 
  end

  def create #post '/patients'
    patient = Patient.create!(patient_params) 
    render json: patient, status: :created 
  end

  def show #get '/patients/:id'
    render json: @patient, serializer: PatientSerializer, status: :ok 
  end

  def update #patch '/patients/:id'
    @patient.update!(patient_params)
    render json: @patient, status: :accepted 
  end

  def destroy #delete '/patients/:id'
    @patient.destroy 
    head :no_content
  end

  private

  def patient_params
    params.require(:patient).permit(:first_name, :last_name, :guardian, :gender, :dob, :address, :phone, :email, :allergies, :notes, :id, :viewed_notice_of_privacy_practices, :created_at)
  end 

  def find_patient
    @patient = Patient.find(params[:id])
  end 

  def is_authorized? 
    permitted = @current_user.admin?
    render json: { errors: {User: "does not have admin permissions."}}, status: :forbidden unless permitted 
  end 
end 

 
## LIVE CODING CHALLENGE:
# return as json all patients with n or more appointments 
#   get '/patient_appts/:n', to: 'patients#patient_appts'

# def patient_appts
#   num_appointments = params[:n].to_i
#   # patients_with_n_appts = Patient.where('appointments > ?', num_appointments)
#   # Patient.join(:appointments).group(:id).having("COUNT(appointments.patient_id) >= ?", n)
#   # appointments = Appointment.all.filter{ |appointment| > num_appointments }
#   patients = Patient.all.filter{|p| p.appointments.length >= num_appointments}
#   render json: patients 

#   # if patients
#   #   render json: patients_with_n_appts, status: :ok 
#   # else  
#   #   render json: {error: "No appointments found with #{num_appointments}"}, status: :not_found
#   # end 
# end 