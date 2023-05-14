function percen = percentilcek(Matrix, givenStd)
    
    if (givenStd <= -3.7)
        x = 0.0100;
        percen = x;
        return;
    end
    
    if (givenStd >= 3.7)
        x = 99.9900;
        percen = x;
        return;
    end

    percen = size(Matrix, 2)
    
    for i = 1:size(Matrix,1)-1
        if ((Matrix(i, 2) <= givenStd))
            percen = Matrix(i, 1)
            return;
        end
    end

    
end