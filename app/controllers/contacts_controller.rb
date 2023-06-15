class ContactsController < ApplicationController
  def create
    contact = Contact.new(contact_params)
    if contact.save
      render json: contact, status: :created
    else
      render json: { error: contact.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def contact_params
    params.permit(:first_name, :last_name, :dob, :phone, :email, :address, :notes)
  end
end
