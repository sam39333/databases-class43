# Database Normalization

1. 1NF is violated by the 'food_code' column because it contains multiple values in one field.

2. The entities that can be extracted from the table are: Members, Dinners, and Foods.

3. To make the database 3NF compliant, we can create tables:

   - Members table with columns: member_id, member_name, and member_address.
   - Dinners table with columns: dinner_id, dinner_date, and venue_code.
   - Foods table with columns: food_code and food_description.
   - Dinner_Members table with columns: dinner_id and member_id.
   - Dinner_Foods table with columns: dinner_id and food_code.
