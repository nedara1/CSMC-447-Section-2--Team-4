class Plan
{
    constructor(name, credits, list)
    {
        this.name = name;
        this.credits = credits;

        for(let i = 0; i < list.length; i++)
        {
            this.list[i] = new Course(list[i])
        }
    }

    init(list)
    {

    }
}

class Course
{
    //example list:
    //name; credits; prerequisites; description;
    //CMSC 102; 3; CMSC 101, TEST 101; Second CMSC intro class;
    constructor(list)
    {
        this.name = "";
        this.num = 0;
        credittemp = "";
        this.credits = 0;
        prereqtemp = "";
        this.prereq = [];
        this.description = "";

        holder = 0;
        for(let i = 0; i < list.length(); i++)
        {
            if(list.charAt(i) == ";")
            {
                holder++;
                i++;
            }
            else
            {
                switch (holder) 
                {
                    case 0:
                        //finds the name of the course
                        this.name = this.name + list.charAt(i);
                        break;
                    case 1:
                        //finds the credit count of the course
                        credittemp = credittemp + list.charAt(i);
                        break;
                    case 2:
                        //finds the prereq temp
                        prereqtemp = prereqtemp + list.charAt(i);
                        break;
                    case 3:
                        //gets the description
                        this.description = this.description + list.charAt(i);
                    default:
                        // Code to be executed if none of the above cases are matched
                        break;
                }
            }
        }

        //decodes the credits and the prereqs
        this.num = Number(this.name.substring(this.name.length() - 2, this.name.length()));
        this.credits = +credittemp;
        holder = 0;
        for(let i = 0; i < prereqtemp.length(); i++)
        {
            if(prereqtemp.charAt(i) == ",")
            {
                holder++;
                i++;
            }
            else
            {
                this.prereq[holder] = this.prereq[holder] + this.prereq.charAt(i);
            }
        }
    }
}