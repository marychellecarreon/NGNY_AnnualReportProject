class ChangeFooterColourTypeInReport < ActiveRecord::Migration[5.0]
  def change
    change_column :reports, :footer_colour, :string
  end
end
