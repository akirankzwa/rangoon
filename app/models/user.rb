class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :account_setting, autosave: true
  has_one :registration, autosave: true
  before_create :build_account_setting, :build_registration

  has_attached_file :avatar, styles: { medium: '300x300>', thumb: '100x100>' }, default_url: '/assets/missing.png'
  validates_attachment_content_type :avatar, content_type: %r{\Aimage\/.*\z}
end
